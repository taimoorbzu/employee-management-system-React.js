function Footer() {
  return (
    <footer className="mx-auto mt-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 border-t border-slate-800 pt-5 text-xs text-slate-500 sm:flex-row">
      <p>
        © All Rights Reserved by Taimoor Khalid {new Date().getFullYear()} - EMS
      </p>
      <p>Employee Management Dashboard</p>
    </footer>
  );
}

export default Footer;
