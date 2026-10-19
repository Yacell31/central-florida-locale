"use client";
import { navigation } from "@/lib/content";
import { ArrowUpRight, Menu, Search, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import brandLogo from "../../public/images/brand-logo.png";
import { useEffect, useRef, useState } from "react";
export function Logo() {
  return (
    <Link href="/" className="logo" title="Central Florida Locale — home">
      <Image
        src={brandLogo}
        alt="Central Florida Locale"
        sizes="(max-width: 900px) 118px, 165px"
        loading="eager"
      />
    </Link>
  );
}
export function Header() {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = menu.current?.querySelector<HTMLElement>("a");
    first?.focus();
    function key(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
      if (e.key === "Tab") {
        const links = menu.current?.querySelectorAll<HTMLElement>("a,button");
        if (!links?.length) return;
        const a = links[0],
          b = links[links.length - 1];
        if (e.shiftKey && document.activeElement === a) {
          e.preventDefault();
          b.focus();
        } else if (!e.shiftKey && document.activeElement === b) {
          e.preventDefault();
          a.focus();
        }
      }
    }
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", key);
    };
  }, [open]);
  return (
    <>
      <div className="announcement">
        LOCAL KNOWLEDGE. A THOUGHTFUL WAY FORWARD.
        <span>
          Serving Central Florida <span className="tiny-star">✳</span>
        </span>
      </div>
      <header className="header">
        <div className="header-inner">
          <Logo />
          <nav aria-label="Main navigation" className="desktop-nav">
            {navigation.map(([name, href]) => (
              <Link href={href} key={href}>
                {name}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <Link
              href="/search"
              className="icon-button"
              aria-label="Search the website"
            >
              <Search size={19} />
            </Link>
            <Link href="/work-with-me" className="header-cta">
              Work With Me
              <ArrowUpRight size={15} />
            </Link>
            <button
              className="menu-trigger icon-button"
              ref={trigger}
              aria-label="Open navigation"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
            >
              <Menu />
            </button>
          </div>
        </div>
      </header>
      {open && (
        <div
          className="mobile-menu"
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
          ref={menu}
        >
          <div className="mobile-menu-top">
            <span>Explore Locale</span>
            <button
              className="icon-button"
              aria-label="Close navigation"
              onClick={() => {
                setOpen(false);
                trigger.current?.focus();
              }}
            >
              <X />
            </button>
          </div>
          {navigation.map(([name, href]) => (
            <Link onClick={() => setOpen(false)} href={href} key={href}>
              {name}
              <ArrowUpRight />
            </Link>
          ))}
          <Link href="/work-with-me" onClick={() => setOpen(false)}>
            Work With Me
            <ArrowUpRight />
          </Link>
          <Link href="/search" onClick={() => setOpen(false)}>
            Search
            <Search />
          </Link>
        </div>
      )}
    </>
  );
}
