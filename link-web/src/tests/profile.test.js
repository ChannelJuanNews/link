const timeout = process.env.SLOWMO ? 30000 : 10000;
const URL_PROFILE = process.env.URL || "http://localhost:3000/profile";

describe("Test header and title of the page", () => {
  beforeAll(async () => {
    await page.goto(URL_PROFILE, { waitUntil: "load" });
  });

  test(
    "Title of the page",
    async () => {
      const title = await page.title();
      expect(title).toBe("Profile");
    },
    timeout
  );

  test(
    "Login ",
    async () => {
      await page.type("#mytextarea", "World", { delay: 100 }); // Types slower, like a user
      await page.type("#mytextarea", "World", { delay: 100 }); // Types slower, like a user
      await page.type("#mytextarea", "World", { delay: 100 }); // Types slower, like a user
      expect(true).toBe(false);
    },
    timeout
  );
});
