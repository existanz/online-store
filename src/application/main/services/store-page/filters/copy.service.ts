class CopyService {
  copy(button: HTMLButtonElement) {
    button.innerText = 'Copied!';
    setTimeout(() => (button.innerText = 'Copy'), 2000);
    navigator.clipboard.writeText(window.location.href);
  }
}

const copyService = new CopyService();
export default copyService;
