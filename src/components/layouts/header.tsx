import HeaderMenu from "@/components/ui/custom/header-menu";

export default function Header({
  authUserId,
}: Readonly<{
  authUserId?: number;
}>) {

  return (
    <header className="header flex flex-col bg-(--sidebar)">
      <HeaderMenu authUserId={authUserId}></HeaderMenu>
    </header>
  );
}