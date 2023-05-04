import { ReactNodeWrapper } from "@/types/index";

export default function PageSection({ children }: ReactNodeWrapper) {
  return <section className="w-full py-80px lg:py-100px">{children}</section>;
}
