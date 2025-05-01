/**
 * @jest-environment jsdom
 */

describe("Username input validation", () => {
  let usernameInput;

  beforeEach(() => {
    // Set up the DOM
    document.body.innerHTML = `
      <input type="text" id="username" />
    `;

    // Re-import the script to attach the event listener
    require("./script");

    // Get the username input element
    usernameInput = document.getElementById("username");
  });

  it("should set the border color to green for a valid username", () => {
    // Simulate valid input
    usernameInput.value = "Valid@123";
    usernameInput.dispatchEvent(new Event("input"));

    // Assert the border color is green
    expect(usernameInput.style.borderColor).toBe("green");
  });

  it("should set the border color to red for an invalid username", () => {
    // Simulate invalid input
    usernameInput.value = "invalid";
    usernameInput.dispatchEvent(new Event("input"));

    // Assert the border color is red
    expect(usernameInput.style.borderColor).toBe("red");
  });
});
