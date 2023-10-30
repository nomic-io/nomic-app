export const TransactionListHeader = () => {
  return (
    <div className="bg-surface px-4 py-5 sm:px-6 rounded-t-lg">
      <div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap">
        <div className="ml-4 mt-4">
          <h3 className="uppercase text-transparent text-sm font-medium bg-clip-text bg-gradient-20 from-gradientStart to-gradientStop">
            Transactions
          </h3>
        </div>
      </div>
    </div>
  );
};
