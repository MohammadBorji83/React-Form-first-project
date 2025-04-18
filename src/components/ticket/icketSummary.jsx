function TicketSummary({ tickets }) {

    const pricePerTicket = 100000;
    const totalTickets = tickets.reduce((sum, ti) => sum + Number(ti.teadadTicket), 0);
    const subtotal = totalTickets * pricePerTicket;
  
    const tax = subtotal * 0.09;  // 9% مالیات
    const discount = totalTickets > 5 ? subtotal * 0.10 : 0;  // تخفیف 10 درصدی
  
    const total = subtotal + tax - discount;
  
    return (
      <div className="mt-10 p-4 bg-green-50 border border-green-200 rounded-xl">
        <h3 className="text-xl font-semibold text-green-700 mb-4">🧾 خلاصه فاکتور شما:</h3>
  
        {tickets.map((ticket, index) => (
          <div key={index} className="border-b border-gray-200 py-2">
            <p>🎯 <span className="font-bold">نام تیم:</span> {ticket.teamName}</p>
            <p>🎫 <span className="font-bold">تعداد بلیط:</span> {ticket.teadadTicket}</p>
            <p>🪑 <span className="font-bold">جایگاه:</span> {ticket.seat}</p>
            <p>📞 <span className="font-bold">شماره تماس:</span> {ticket.phone}</p>
          </div>
        ))}
  
        <div className="mt-6 p-4 bg-white rounded-lg shadow-inner space-y-2">
          <p className="flex justify-between font-semibold text-gray-700">
            <span>💳 مجموع بلیط‌ها ({totalTickets} عدد)</span>
            <span>{subtotal.toLocaleString()} تومان</span>
          </p>
          <p className="flex justify-between text-gray-600">
            <span>💡 مالیات (۹٪)</span>
            <span>{tax.toLocaleString()} تومان</span>
          </p>
          {discount > 0 && (
            <p className="flex justify-between text-green-600 font-bold">
              <span>🎁 تخفیف ویژه</span>
              <span>-{discount.toLocaleString()} تومان</span>
            </p>
          )}
          <p className="flex justify-between font-bold text-xl text-green-700 border-t pt-2">
            <span>💰 مبلغ نهایی</span>
            <span>{total.toLocaleString()} تومان</span>
          </p>
        </div>
  
        <div className="mt-4 text-center text-green-800 font-bold">
          ✅ سفارش شما با موفقیت ثبت شد!
        </div>
      </div>
    );
  }
  
  export default  TicketSummary;
  