export class Popover {
  constructor() {
    this.popover = null;
    this.targetElement = null;
    this.handleResize = this.handleResize.bind(this);
  }

  showPopover(title, message, element) {
    this.removePopover();

    this.targetElement = element;

    const popover = document.createElement("div");
    popover.classList.add("popover");

    const popoverTitle = document.createElement("div");
    popoverTitle.classList.add("popoverTitle");
    popoverTitle.textContent = title;

    const popoverMessage = document.createElement("div");
    popoverMessage.classList.add("popoverMessage");
    popoverMessage.textContent = message;

    popover.append(popoverTitle, popoverMessage);

    document.body.appendChild(popover);

    this.popover = popover;

    this.updatePosition();

    window.addEventListener("resize", this.handleResize);
  }

  removePopover() {
    if (this.popover) {
      console.log("removing");
      this.popover.remove();
      this.popover = null;
    } else {
      console.log("notfound");
    }
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize() {
    this.updatePosition();
  }

  updatePosition() {
    if (!this.popover || !this.targetElement) return;

    const { left, top, width } = this.targetElement.getBoundingClientRect();

    this.popover.style.left =
      left + width / 2 - this.popover.offsetWidth / 2 + "px";
    this.popover.style.bottom = top + this.popover.offsetHeight - 15 + "px";
  }
}
