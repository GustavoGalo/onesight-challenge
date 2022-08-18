import NextLink from "next/link";

interface ILinkProps {
  href: string;
  children: React.ReactNode;
}

export const Link: React.FC<ILinkProps> = ({ href, children }) => (
  <NextLink href={href} passHref>
    <a>{children}</a>
  </NextLink>
);

export default Link;
