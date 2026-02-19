// src/components/layout/Container.jsx
// ============================================================
// Container — NurPath Layout Primitive
//
// Consistent max-width + horizontal padding across all pages.
// Uses .container-custom from index.css
// (max-w-[1440px] · px-4 sm:px-8 lg:px-12)
//
// Usage:
//   <Container>...</Container>
//   <Container as="section">...</Container>
//   <Container narrow>...</Container>    ← max-w-4xl for articles
//   <Container fluid>...</Container>     ← full width, padding only
// ============================================================

import { cn } from "../../utils/cn";

const Container = ({
  as: Tag = "div",
  narrow = false, // narrower container for reading content
  fluid = false, // full width — keeps padding, removes max-width
  className,
  children,
  ...props
}) => {
  return (
    <Tag
      className={cn(
        // Base padding — always applied
        "w-full mx-auto px-4 sm:px-8 lg:px-12",

        // Max-width variants
        !fluid && !narrow && "max-w-[1440px]", // default — full site width
        narrow && "max-w-4xl", // articles, detail pages
        fluid && "max-w-none", // hero backgrounds etc.

        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default Container;
