import React, { ReactNode } from 'react';

export const metadata = {
  title: 'Typik | A simple user-friendly typing experience',
  description: 'Typik is a typing trainer and test web app',
};

const Layout = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/icons/favicon.svg" />
      </head>
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
};

export default Layout;
