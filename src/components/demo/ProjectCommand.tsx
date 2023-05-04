import Image from "next/image";

export default function ProjectCommand() {
  const repository = "https://github.com/giannisrig/next-core-template";

  const copyCode = () => {
    // const codeElement = document.querySelector("#projectCode");
    // const codeText = codeElement.innerText.trim();
    const codeElement: Element = document.querySelector("#projectCode");
    const codeText = codeElement.textContent;
    navigator.clipboard.writeText(codeText).then(
      () => {
        console.log(`Copied ${codeText} to clipboard`);
      },
      () => {
        console.error("Failed to copy text to clipboard");
      }
    );
  };

  return (
    <div className="flex flex-col items-start gap-20px mdl:flex-row mdl:items-center">
      <div className="flex w-max max-w-full items-center justify-center gap-12px overflow-x-auto  rounded-xl border border-amethyst bg-mirage p-4 text-xs text-green backdrop-blur-2xl mdl:text-sm ">
        <div className="grow overflow-x-auto">
          <code id="projectCode" className="font-mono block w-max font-bold">
            npx create-next-app --e {repository} YOUR_APP_NAME
          </code>
        </div>
        <button
          type="button"
          onClick={() => copyCode()}
          className="rounded-full bg-bleached p-10px transition-colors duration-200 hover:bg-green focus:bg-green"
        >
          <Image className="invert" src="/images/demo/copy.svg" alt={`Copy icon`} width={15} height={15} />
        </button>
      </div>
      <div className="flex items-center gap-5px text-sm text-amethyst">
        <Image className="invert" src="/images/demo/nodejs.svg" alt={`NodeJS icon`} width={22} height={22} />
        <span>Node.js 14.18.0 or newer</span>
      </div>
    </div>
  );
}
