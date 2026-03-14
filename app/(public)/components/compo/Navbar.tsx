// "use client";

// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState, useCallback, useMemo, memo, useEffect } from "react";
// import { NAV_ITEMS, NavItem, Route } from "../../../../constants/routes";

// const NavLink = memo(
//   ({
//     item,
//     onRouteNav,
//     onScrollNav,
//     onClick,
//     mobile = false,
//   }: {
//     item: NavItem;
//     onRouteNav: (routeKey: NavItem["route"]) => void;
//     onScrollNav: (targetId: string) => void;
//     onClick?: () => void;
//     mobile?: boolean;
//   }) => {
//     const handleClick = useCallback(() => {
//       if (item.type === "route") onRouteNav(item.route);
//       else if (item.targetId) onScrollNav(item.targetId);
//       onClick?.();
//     }, [item, onRouteNav, onScrollNav, onClick]);

//     if (mobile) {
//       return (
//         <button
//           onClick={handleClick}
//           className="w-full text-left text-white/55 hover:text-white transition-colors duration-200 py-4 text-[15px] font-light tracking-wide border-b border-white/[0.07] last:border-0 cursor-pointer"
//         >
//           {item.label}
//         </button>
//       );
//     }

//     return (
//       <button
//         onClick={handleClick}
//         className="relative text-white/70 transition-all duration-300 ease-out hover:text-white hover:-translate-y-[1px] cursor-pointer group text-[13px] tracking-wide"
//       >
//         {item.label}
//         <span className="absolute left-1/2 -bottom-1 h-px w-0 bg-white/70 transition-all duration-300 group-hover:w-full group-hover:left-0" />
//       </button>
//     );
//   }
// );
// NavLink.displayName = "NavLink";

// const Logo = memo(() => (
//   <Link
//     href="/"
//     className="relative w-[52px] h-[52px] sm:w-[58px] sm:h-[58px] group cursor-pointer flex-shrink-0 block"
//   >
//     <img
//       src="/psoc-logo-white.png"
//       alt="PSOC Logo"
//       className="absolute inset-0 w-full h-full object-contain transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 group-hover:opacity-0"
//     />
//     <img
//       src="/camera-navbar.png"
//       alt="Camera"
//       className="absolute inset-0 w-full h-full object-contain opacity-0 scale-75 transition-all duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 group-hover:scale-100"
//     />
//   </Link>
// ));
// Logo.displayName = "Logo";

// const TransitionOverlay = memo(({ isTransitioning }: { isTransitioning: boolean }) => (
//   <div
//     className={`fixed inset-0 z-[100] pointer-events-none transition-all duration-300 ${
//       isTransitioning
//         ? "backdrop-blur-xl bg-black/40 opacity-100"
//         : "backdrop-blur-none opacity-0"
//     }`}
//   />
// ));
// TransitionOverlay.displayName = "TransitionOverlay";

// const HamburgerIcon = ({ open }: { open: boolean }) => (
//   <div className="flex flex-col justify-center items-center w-5 h-4 gap-[5px]">
//     <span className={`block h-[1.5px] bg-white/80 transition-all duration-300 origin-center ${open ? "w-5 rotate-45 translate-y-[6.5px]" : "w-5"}`} />
//     <span className={`block h-[1.5px] bg-white/80 transition-all duration-300 ${open ? "w-0 opacity-0" : "w-4 opacity-100"}`} />
//     <span className={`block h-[1.5px] bg-white/80 transition-all duration-300 origin-center ${open ? "w-5 -rotate-45 -translate-y-[6.5px]" : "w-5"}`} />
//   </div>
// );

// export default function Navbar({
//   visible,
//   onNavigate,
// }: {
//   visible: boolean;
//   onNavigate?: (targetId: string) => void;
// }) {
//   const router = useRouter();
//   const [isRouteTransitioning, setIsRouteTransitioning] = useState(false);
//   const [mobileOpen, setMobileOpen]                     = useState(false);
//   const [scrolled, setScrolled]                         = useState(false);

//   // Lock body scroll when mobile menu is open
//   useEffect(() => {
//     document.body.style.overflow = mobileOpen ? "hidden" : "";
//     return () => { document.body.style.overflow = ""; };
//   }, [mobileOpen]);

//   // Detect scroll — threshold at 24px so it triggers just after the user starts scrolling
//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 24);
//     onScroll(); // set initial state in case page loads mid-scroll
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   const handleRouteNav = useCallback(
//     (routeKey: NavItem["route"]) => {
//       setIsRouteTransitioning(true);
//       setMobileOpen(false);
//       setTimeout(() => { router.push(Route[routeKey]); }, 300);
//     },
//     [router]
//   );

//   const handleScrollNav = useCallback(
//     (targetId: string) => {
//       onNavigate?.(targetId);
//       setMobileOpen(false);
//     },
//     [onNavigate]
//   );

//   const headerClassName = useMemo(
//     () =>
//       `fixed top-0 left-0 w-full z-50 transition-opacity duration-700 ${
//         visible ? "opacity-100" : "opacity-0 pointer-events-none"
//       }`,
//     [visible]
//   );

//   // Pill styles: at top → subtle pill, on scroll → stronger blur + dark bg + bottom border
//   const pillScrollClass = scrolled && !mobileOpen
//     ? "bg-black/60 backdrop-blur-2xl border-white/[0.10] shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
//     : mobileOpen
//       ? "bg-white/[0.06] backdrop-blur-md border-white/[0.14] rounded-b-none"
//       : "bg-white/[0.05] backdrop-blur-md border-white/[0.12] shadow-[0_4px_24px_rgba(0,0,0,0.25)]";

//   // Subtle bottom border line that fades in on scroll (acts as a separator from page content)
//   const scrollBorderClass = scrolled && !mobileOpen
//     ? "opacity-100"
//     : "opacity-0";

//   return (
//     <>
//       <TransitionOverlay isTransitioning={isRouteTransitioning} />

//       {/* Mobile full-screen blur overlay */}
//       <div
//         className={`fixed inset-0 z-40 transition-all duration-500 ease-in-out md:hidden ${
//           mobileOpen
//             ? "opacity-100 pointer-events-auto backdrop-blur-2xl bg-black/60"
//             : "opacity-0 pointer-events-none backdrop-blur-none"
//         }`}
//         onClick={() => setMobileOpen(false)}
//       />

//       <header className={headerClassName}>
//         <div className="flex justify-center pt-1.5 sm:pt-2 px-4 sm:px-6">
//           <div className="w-full max-w-3xl">

//             {/* Pill container */}
//             <div
//               className={`relative transition-all duration-500 rounded-2xl border ${pillScrollClass}`}
//             >
//               {/* Top shimmer line — always present */}
//               <div className="absolute top-0 inset-x-12 h-px bg-gradient-to-r from-transparent via-white/[0.15] to-transparent rounded-full pointer-events-none" />

//               {/* Bottom separator — fades in on scroll */}
//               <div
//                 className={`absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none transition-opacity duration-500 ${scrollBorderClass}`}
//               />

//               <div className="px-5 sm:px-7 h-16 sm:h-[70px] flex items-center justify-between">
//                 <Logo />

//                 {/* Desktop nav */}
//                 <nav className="hidden md:flex gap-8 lg:gap-10">
//                   {NAV_ITEMS.map((item) => (
//                     <NavLink
//                       key={item.label}
//                       item={item}
//                       onRouteNav={handleRouteNav}
//                       onScrollNav={handleScrollNav}
//                     />
//                   ))}
//                 </nav>

//                 {/* Mobile hamburger */}
//                 <button
//                   className="md:hidden relative z-50 p-2 text-white/70 hover:text-white transition-colors cursor-pointer"
//                   onClick={() => setMobileOpen((p) => !p)}
//                   aria-label={mobileOpen ? "Close menu" : "Open menu"}
//                 >
//                   <HamburgerIcon open={mobileOpen} />
//                 </button>
//               </div>
//             </div>

//             {/* Mobile dropdown — extends below pill */}
//             <div
//               className={`md:hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden rounded-b-2xl border-x border-b bg-white/[0.05] backdrop-blur-md ${
//                 mobileOpen
//                   ? "max-h-[500px] opacity-100 border-white/[0.12]"
//                   : "max-h-0 opacity-0 border-transparent"
//               }`}
//             >
//               <nav className="flex flex-col px-5 sm:px-7 pt-1 pb-6">
//                 {NAV_ITEMS.map((item, i) => (
//                   <div
//                     key={item.label}
//                     className={`transition-[transform,opacity] duration-[400ms] ease-in-out ${
//                       mobileOpen ? "translate-y-0 opacity-100" : "-translate-y-1.5 opacity-0"
//                     }`}
//                     style={{
//                       transitionDelay: mobileOpen ? `${i * 55}ms` : "0ms",
//                     }}
//                   >
//                     <NavLink
//                       item={item}
//                       onRouteNav={handleRouteNav}
//                       onScrollNav={handleScrollNav}
//                       mobile
//                     />
//                   </div>
//                 ))}
//               </nav>
//             </div>

//           </div>
//         </div>
//       </header>
//     </>
//   );
// }

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useCallback, memo, useEffect, useRef } from "react";
import { NAV_ITEMS, NavItem, Route } from "../../../../constants/routes";
import GlassSurface from "./GlassSurface";

const NavFont = () => (
  <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&display=swap');`}</style>
);

const NavLink = memo(
  ({
    item,
    onRouteNav,
    onScrollNav,
    onClick,
    mobile = false,
  }: {
    item: NavItem;
    onRouteNav: (routeKey: NavItem["route"]) => void;
    onScrollNav: (targetId: string) => void;
    onClick?: () => void;
    mobile?: boolean;
  }) => {
    const handleClick = useCallback(() => {
      if (item.type === "route") onRouteNav(item.route);
      else if (item.targetId) onScrollNav(item.targetId);
      onClick?.();
    }, [item, onRouteNav, onScrollNav, onClick]);

    if (mobile) {
      return (
        <button
          onClick={handleClick}
          className="w-full text-left text-white/70 hover:text-white transition-colors duration-200 py-4 border-b border-white/[0.06] last:border-0 cursor-pointer"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "17px",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          {item.label}
        </button>
      );
    }

    return (
      <button
        onClick={handleClick}
        className="relative text-white transition-all duration-300 ease-out hover:-translate-y-[1px] cursor-pointer group"
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "15px",
          fontWeight: 600,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}
      >
        {/* Hover glow behind text */}
        <span className="absolute inset-x-[-8px] inset-y-[-4px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "radial-gradient(ellipse at center, rgba(255,255,255,0.08) 0%, transparent 70%)" }}
        />
        <span className="relative z-10">{item.label}</span>
        <span className="absolute left-0 -bottom-1 h-px w-0 bg-white/60 transition-all duration-500 ease-out group-hover:w-full" />
      </button>
    );
  }
);
NavLink.displayName = "NavLink";

const Logo = memo(() => (
  <Link
    href="/"
    className="relative w-[52px] h-[52px] sm:w-[58px] sm:h-[58px] group cursor-pointer flex-shrink-0 block"
  >
    <img
      src="/psoc-logo-white.png"
      alt="PSOC Logo"
      className="absolute inset-0 w-full h-full object-contain transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 group-hover:opacity-0"
    />
    <img
      src="/camera-navbar2.png"
      alt="Camera"
      className="absolute inset-0 w-full h-full object-contain opacity-0 scale-75 transition-all duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 group-hover:scale-100"
    />
  </Link>
));
Logo.displayName = "Logo";

const HamburgerIcon = ({ open }: { open: boolean }) => (
  <div className="flex flex-col justify-center items-center w-5 h-4 gap-[5px]">
    <span className={`block h-[1.5px] bg-white transition-all duration-300 origin-center ${open ? "w-5 rotate-45 translate-y-[6.5px]" : "w-5"}`} />
    <span className={`block h-[1.5px] bg-white transition-all duration-300 ${open ? "w-0 opacity-0" : "w-4 opacity-100"}`} />
    <span className={`block h-[1.5px] bg-white transition-all duration-300 origin-center ${open ? "w-5 -rotate-45 -translate-y-[6.5px]" : "w-5"}`} />
  </div>
);

/* ── Cursor light that follows mouse across the navbar pill ── */
const CursorLight = ({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) => {
  const lightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (lightRef.current) {
        lightRef.current.style.opacity = "1";
        lightRef.current.style.background =
          `radial-gradient(200px circle at ${x}px ${y}px, rgba(255,255,255,0.06), transparent 70%)`;
      }
    };

    const handleMouseLeave = () => {
      if (lightRef.current) lightRef.current.style.opacity = "0";
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [containerRef]);

  return (
    <div
      ref={lightRef}
      className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
      style={{ opacity: 0, zIndex: 20 }}
    />
  );
};

const NavContent = ({
  mobileOpen,
  setMobileOpen,
  handleRouteNav,
  handleScrollNav,
}: {
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleRouteNav: (routeKey: NavItem["route"]) => void;
  handleScrollNav: (targetId: string) => void;
}) => (
  <div className="w-full px-5 sm:px-7 h-16 sm:h-[70px] flex items-center justify-between">
    <Logo />
    <nav className="hidden md:flex gap-8 lg:gap-10">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.label}
          item={item}
          onRouteNav={handleRouteNav}
          onScrollNav={handleScrollNav}
        />
      ))}
    </nav>
    <button
      className="md:hidden relative z-50 p-2 text-white hover:text-white/80 transition-colors cursor-pointer"
      onClick={() => setMobileOpen((p) => !p)}
      aria-label={mobileOpen ? "Close menu" : "Open menu"}
    >
      <HamburgerIcon open={mobileOpen} />
    </button>
  </div>
);

const MobileNav = ({
  mobileOpen,
  handleRouteNav,
  handleScrollNav,
}: {
  mobileOpen: boolean;
  handleRouteNav: (routeKey: NavItem["route"]) => void;
  handleScrollNav: (targetId: string) => void;
}) => (
  <nav className="w-full flex flex-col px-5 sm:px-7 pt-2 pb-6">
    {NAV_ITEMS.map((item, i) => (
      <div
        key={item.label}
        className={`transition-[transform,opacity] duration-[400ms] ease-in-out ${
          mobileOpen ? "translate-y-0 opacity-100" : "-translate-y-1.5 opacity-0"
        }`}
        style={{ transitionDelay: mobileOpen ? `${i * 55}ms` : "0ms" }}
      >
        <NavLink
          item={item}
          onRouteNav={handleRouteNav}
          onScrollNav={handleScrollNav}
          mobile
        />
      </div>
    ))}
  </nav>
);

export default function Navbar({
  visible,
  onNavigate,
}: {
  visible: boolean;
  onNavigate?: (targetId: string) => void;
}) {
  const router                        = useRouter();
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [scrolled, setScrolled]       = useState(false);
  const [mounted, setMounted]         = useState(false);
  const pillRef                       = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleRouteNav = useCallback(
    (routeKey: NavItem["route"]) => {
      setMobileOpen(false);
      router.push(Route[routeKey]);
    },
    [router]
  );

  const handleScrollNav = useCallback(
    (targetId: string) => {
      onNavigate?.(targetId);
      setMobileOpen(false);
    },
    [onNavigate]
  );

  const pillBrightness        = scrolled && !mobileOpen ? 25   : 60;
  const pillOpacity           = 0.97;
  const pillBackgroundOpacity = scrolled && !mobileOpen ? 0.60 : 0.60;
  const pillBorderAlpha       = scrolled && !mobileOpen ? 0.18 : 0.13;

  return (
    <>
      <NavFont />

      {/* Mobile backdrop */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 md:hidden ${
          mobileOpen
            ? "opacity-100 pointer-events-auto bg-black/25 backdrop-blur-sm"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      <header
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }}
        className={`transition-opacity duration-700 ${
          visible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex justify-center pt-1.5 sm:pt-2 px-4 sm:px-6">
          <div className="w-full max-w-3xl">

            {/* ── Glass pill ── */}
            <div
              ref={pillRef}
              className={`relative rounded-2xl transition-all duration-500 ${mobileOpen ? "rounded-b-none" : ""}`}
              style={{
                borderTop:    `1px solid rgba(255,255,255,${pillBorderAlpha})`,
                borderLeft:   `1px solid rgba(255,255,255,${pillBorderAlpha})`,
                borderRight:  `1px solid rgba(255,255,255,${pillBorderAlpha})`,
                borderBottom: mobileOpen
                  ? "none"
                  : `1px solid rgba(255,255,255,${pillBorderAlpha})`,
              }}
            >
              <CursorLight containerRef={pillRef} />

              {mounted ? (
                <GlassSurface
                  width="100%"
                  height="auto"
                  borderRadius={16}
                  borderWidth={0.03}
                  brightness={pillBrightness}
                  opacity={pillOpacity}
                  backgroundOpacity={pillBackgroundOpacity}
                  blur={80}
                  displace={0}
                  distortionScale={-20}
                  redOffset={0}
                  greenOffset={0}
                  blueOffset={0}
                  xChannel="R"
                  yChannel="G"
                  mixBlendMode="difference"
                >
                  <NavContent
                    mobileOpen={mobileOpen}
                    setMobileOpen={setMobileOpen}
                    handleRouteNav={handleRouteNav}
                    handleScrollNav={handleScrollNav}
                  />
                </GlassSurface>
              ) : (
                <div
                  className="rounded-2xl"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    backdropFilter: "blur(24px) saturate(180%)",
                    WebkitBackdropFilter: "blur(24px) saturate(180%)",
                  }}
                >
                  <NavContent
                    mobileOpen={mobileOpen}
                    setMobileOpen={setMobileOpen}
                    handleRouteNav={handleRouteNav}
                    handleScrollNav={handleScrollNav}
                  />
                </div>
              )}
            </div>

            {/* ── Mobile dropdown ── */}
            <div
              className={`md:hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden ${
                mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div
                className="rounded-b-2xl"
                style={{
                  borderLeft:   "1px solid rgba(255,255,255,0.13)",
                  borderRight:  "1px solid rgba(255,255,255,0.13)",
                  borderBottom: "1px solid rgba(255,255,255,0.13)",
                }}
              >
                {mounted ? (
                  <GlassSurface
                    width="100%"
                    height="auto"
                    borderRadius={16}
                    borderWidth={0.03}
                    brightness={15}
                    opacity={0.97}
                    backgroundOpacity={0.10}
                    blur={8}
                    displace={0}
                    distortionScale={-20}
                    redOffset={0}
                    greenOffset={2}
                    blueOffset={4}
                    xChannel="R"
                    yChannel="G"
                    mixBlendMode="difference"
                    className="!rounded-t-none"
                  >
                    <MobileNav
                      mobileOpen={mobileOpen}
                      handleRouteNav={handleRouteNav}
                      handleScrollNav={handleScrollNav}
                    />
                  </GlassSurface>
                ) : (
                  <div
                    className="rounded-b-2xl"
                    style={{
                      background: "rgba(14,14,14,0.52)",
                      backdropFilter: "blur(24px) saturate(180%)",
                      WebkitBackdropFilter: "blur(24px) saturate(180%)",
                    }}
                  >
                    <MobileNav
                      mobileOpen={mobileOpen}
                      handleRouteNav={handleRouteNav}
                      handleScrollNav={handleScrollNav}
                    />
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </header>
    </>
  );
}