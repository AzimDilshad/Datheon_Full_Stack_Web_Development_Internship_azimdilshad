// project data for the popups. cards in index.html use the same ids.
// all of this is sample content, swap in your own repos and numbers.
// "icon" must match a class name generated into css/icons.css (t-xxx for logos, i-xxx for plain icons)
window.PROJECTS = {
  shopflow: {
    title: "ShopFlow E2E Suite",
    img: "https://picsum.photos/seed/shopflow-storefront/1000/438",
    desc: "A full browser test suite for an open-source demo shop. It covers sign-up, search, cart, coupon codes and checkout, and it runs on every pull request.",
    points: [
      "Page object model in TypeScript, so a selector change is a one-line fix.",
      "Tests are sharded across four GitHub Actions jobs and merged into one report.",
      "Retries are limited to known network errors, so real bugs are not hidden.",
      "Visual checks on the cart page catch layout breaks that functional tests miss."
    ],
    stack: [
      { name: "Playwright", icon: "t-playwright" },
      { name: "TypeScript", icon: "t-typescript" },
      { name: "GitHub Actions", icon: "t-githubactions" },
      { name: "Allure Report", icon: "i-bug" }
    ],
    repo: "https://github.com/rohanmenon-dev/shopflow-e2e",
    demo: "https://shopflow-report.vercel.app"
  },

  contract: {
    title: "Contract Check",
    img: "https://picsum.photos/seed/contract-check-docs/1000/438",
    desc: "A small Python tool that reads an OpenAPI file, calls each endpoint on a staging server and reports every response that does not match the documented shape.",
    points: [
      "Generates Pytest cases from the spec, so new endpoints get coverage automatically.",
      "Postman collections are exported for the team to run by hand when debugging.",
      "Fails the build when a field is removed or its type changes without a version bump.",
      "Writes a plain HTML report that product managers can actually read."
    ],
    stack: [
      { name: "Python", icon: "t-python" },
      { name: "Pytest", icon: "t-pytest" },
      { name: "Postman", icon: "t-postman" },
      { name: "REST Assured", icon: "i-flask" }
    ],
    repo: "https://github.com/rohanmenon-dev/contract-check",
    demo: ""
  },

  pocketqa: {
    title: "PocketQA",
    img: "https://picsum.photos/seed/pocketqa-phones/1000/438",
    desc: "Smoke tests for an Android app. A script boots an emulator, installs the latest build and runs the login, search and payment flows.",
    points: [
      "Appium with Python and Pytest fixtures that start and stop the emulator cleanly.",
      "Screenshots and device logs are attached to every failed test.",
      "Runs from a Jenkins job whenever a new debug build is uploaded.",
      "Locators use accessibility ids first, which survived two UI redesigns without edits."
    ],
    stack: [
      { name: "Appium", icon: "t-appium" },
      { name: "Python", icon: "t-python" },
      { name: "Pytest", icon: "t-pytest" },
      { name: "Jenkins", icon: "t-jenkins" }
    ],
    repo: "https://github.com/rohanmenon-dev/pocketqa",
    demo: ""
  },

  gridrunner: {
    title: "Grid Runner",
    img: "https://picsum.photos/seed/grid-runner-racks/1000/438",
    desc: "A Selenium Grid that lives in Docker Compose, plus a Jenkins pipeline that runs the same Java test suite on Chrome, Firefox and Edge overnight.",
    points: [
      "One compose file brings up the hub and browser nodes in under a minute.",
      "TestNG groups split smoke tests from the slower regression pack.",
      "Maven profiles pick the browser, so local runs and CI use the same command.",
      "Failed runs keep a video recording of the node for easier debugging."
    ],
    stack: [
      { name: "Selenium", icon: "t-selenium" },
      { name: "Java", icon: "t-openjdk" },
      { name: "Docker", icon: "t-docker" },
      { name: "Jenkins", icon: "t-jenkins" },
      { name: "Maven", icon: "t-apachemaven" }
    ],
    repo: "https://github.com/rohanmenon-dev/grid-runner",
    demo: ""
  },

  flakewatch: {
    title: "Flake Watch",
    img: "https://picsum.photos/seed/flake-watch-charts/1000/438",
    desc: "Flaky tests waste hours. This project stores every CI result in PostgreSQL, finds tests that both pass and fail on the same commit and ranks them by how often they do it.",
    points: [
      "A GitHub Action uploads JUnit XML results after each workflow run.",
      "SQL views calculate flake rate per test over the last thirty days.",
      "A weekly job posts the top ten offenders to the team channel.",
      "Tests can be quarantined with a single tag until someone fixes them."
    ],
    stack: [
      { name: "Python", icon: "t-python" },
      { name: "PostgreSQL", icon: "t-postgresql" },
      { name: "GitHub Actions", icon: "t-githubactions" },
      { name: "Docker", icon: "t-docker" }
    ],
    repo: "https://github.com/rohanmenon-dev/flake-watch",
    demo: "https://flake-watch-demo.vercel.app"
  }
};
