const SectionFlex = ({ title, children }: any) => {
  return (
        <section className="mt-14">
            <h3 className="text-xl mb-2 font-bold mb-6 md:text-2xl">{title}</h3>
            <div className="flex items-center justify-around flex-wrap gap-y-5 gap-x-7 md:justify-start">
            {children}
            </div>
        </section>
  );
};

export default SectionFlex;
