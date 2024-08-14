export default function CardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <>
        <main>{ children }</main>
      </>
    );
  }
  