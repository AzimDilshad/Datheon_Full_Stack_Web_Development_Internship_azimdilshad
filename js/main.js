// main.js, everything interactive lives here. no libraries.

(function () {
  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- theme toggle ----------
  var themeBtn = document.getElementById("themeBtn");
  themeBtn.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    // storage can throw in private windows, so ignore failures
    try { localStorage.setItem("theme", next); } catch (e) {}
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", next === "dark" ? "#0c0d0e" : "#fafafa");
  });

  // ---------- mobile menu ----------
  var menuBtn = document.getElementById("menuBtn");
  var nav = document.getElementById("nav");

  function setMenu(open) {
    nav.setAttribute("data-open", open ? "true" : "false");
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  menuBtn.addEventListener("click", function () {
    setMenu(menuBtn.getAttribute("aria-expanded") !== "true");
  });
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menuBtn.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      menuBtn.focus();
    }
  });
  // if someone rotates a tablet or resizes, make sure the panel resets
  window.matchMedia("(min-width: 860px)").addEventListener("change", function () { setMenu(false); });

  // ---------- header border once you leave the top ----------
  var header = document.getElementById("siteHeader");
  var sentinel = document.getElementById("sentinel");
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      header.setAttribute("data-stuck", entries[0].isIntersecting ? "false" : "true");
    }).observe(sentinel);

    // ---------- scroll reveal ----------
    var revealEls = document.querySelectorAll("[data-reveal]");
    var revealIO = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          obs.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    revealEls.forEach(function (el) {
      if (reduceMotion) el.classList.add("in");
      else revealIO.observe(el);
    });

    // ---------- highlight the nav link for the section on screen ----------
    var links = {};
    document.querySelectorAll(".nav-links a").forEach(function (a) {
      links[a.getAttribute("href").slice(1)] = a;
    });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var link = links[en.target.id];
        if (!link) return;
        if (en.isIntersecting) {
          Object.keys(links).forEach(function (k) { links[k].removeAttribute("aria-current"); });
          link.setAttribute("aria-current", "true");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(links).forEach(function (id) {
      var sec = document.getElementById(id);
      if (sec) spy.observe(sec);
    });
  } else {
    // very old browser, just show everything
    document.querySelectorAll("[data-reveal]").forEach(function (el) { el.classList.add("in"); });
  }

  // ---------- project popups ----------
  var modal = document.getElementById("projectModal");
  var mImg = document.getElementById("modalImg");
  var mTitle = document.getElementById("modalTitle");
  var mDesc = document.getElementById("modalDesc");
  var mPoints = document.getElementById("modalPoints");
  var mStack = document.getElementById("modalStack");
  var mLinks = document.getElementById("modalLinks");

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }

  function linkBtn(href, label, iconClass, primary) {
    var a = el("a", "btn " + (primary ? "btn-primary" : "btn-ghost"));
    a.href = href;
    a.target = "_blank";
    a.rel = "noopener";
    a.appendChild(el("span", "i " + iconClass));
    a.appendChild(document.createTextNode(" " + label));
    a.firstChild.setAttribute("aria-hidden", "true");
    return a;
  }

  function openProject(id) {
    var p = window.PROJECTS && window.PROJECTS[id];
    if (!p) return;

    mImg.src = p.img;
    mImg.alt = "";
    mTitle.textContent = p.title;
    mDesc.textContent = p.desc;

    mPoints.textContent = "";
    p.points.forEach(function (t) { mPoints.appendChild(el("li", "", t)); });

    mStack.textContent = "";
    p.stack.forEach(function (s) {
      var chip = el("span", "chip");
      var ic = el("span", (s.icon.indexOf("t-") === 0 ? "t " : "i ") + s.icon);
      ic.setAttribute("aria-hidden", "true");
      chip.appendChild(ic);
      chip.appendChild(document.createTextNode(s.name));
      mStack.appendChild(chip);
    });

    mLinks.textContent = "";
    mLinks.appendChild(linkBtn(p.repo, "Source on GitHub", "i-github-logo", true));
    if (p.demo) mLinks.appendChild(linkBtn(p.demo, "Live report", "i-arrow-up-right", false));

    document.body.classList.add("no-scroll");
    modal.showModal();
  }

  document.querySelectorAll("[data-project]").forEach(function (btn) {
    btn.addEventListener("click", function () { openProject(btn.getAttribute("data-project")); });
  });
  document.getElementById("modalClose").addEventListener("click", function () { modal.close(); });
  // clicking the dim area outside the box closes it too
  modal.addEventListener("click", function (e) { if (e.target === modal) modal.close(); });
  modal.addEventListener("close", function () { document.body.classList.remove("no-scroll"); });

  // ---------- contact form ----------
  // there is no backend, so on success we open the visitor's mail app with the message filled in.
  // todo: swap for formspree or a serverless function if you want real submissions
  var form = document.getElementById("contactForm");
  var msg = document.getElementById("formMsg");
  var sendBtn = document.getElementById("sendBtn");
  var TO = "rohan.menon.dev@example.com";

  function setError(input, text) {
    var field = input.closest(".field");
    field.setAttribute("data-invalid", text ? "true" : "false");
    document.getElementById(input.id + "-err").textContent = text;
    if (text) input.setAttribute("aria-invalid", "true");
    else input.removeAttribute("aria-invalid");
    return !text;
  }

  function validate() {
    var n = form.elements.name, e = form.elements.email, m = form.elements.message;
    var okName = setError(n, n.value.trim().length < 2 ? "Please enter your name." : "");
    var okMail = setError(e, /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e.value.trim()) ? "" : "That email address does not look right.");
    var okMsg = setError(m, m.value.trim().length < 10 ? "Write at least a short sentence (10 characters)." : "");
    return okName && okMail && okMsg;
  }

  // clear an error as soon as the visitor starts fixing it
  ["name", "email", "message"].forEach(function (id) {
    form.elements[id].addEventListener("input", function (ev) {
      if (ev.target.closest(".field").getAttribute("data-invalid") === "true") setError(ev.target, "");
    });
  });

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    msg.removeAttribute("data-state");
    msg.textContent = "";
    if (!validate()) {
      var bad = form.querySelector('[aria-invalid="true"]');
      if (bad) bad.focus();
      return;
    }
    sendBtn.disabled = true;
    msg.textContent = "Opening your mail app...";

    var subject = encodeURIComponent("Portfolio message from " + form.elements.name.value.trim());
    var body = encodeURIComponent(form.elements.message.value.trim() + "\n\n" + form.elements.name.value.trim() + "\n" + form.elements.email.value.trim());
    window.location.href = "mailto:" + TO + "?subject=" + subject + "&body=" + body;

    setTimeout(function () {
      sendBtn.disabled = false;
      msg.setAttribute("data-state", "ok");
      msg.textContent = "Thanks, your draft is ready to send. If nothing opened, email me directly.";
      form.reset();
    }, 900);
  });

  // ---------- footer year ----------
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
