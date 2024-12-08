import { Popover } from "./popover";

const btn = document.querySelector("button");

const popover = new Popover();

btn.addEventListener("click", (e) => {
  e.preventDefault();
  const title = "Title";
  const message = "Aaaaaaawesome message";

  popover.showPopover(title, message, btn);
});
