
function Invoice({ data, onReset }) {
    const { customer, orders } = data;
  
    return (
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-6">
        <h2 className="text-xl font-bold border-b pb-2">✅ سفارش با موفقیت ثبت شد</h2>
        
       
        <div className="space-y-2">
             <p><strong>نام:</strong> {customer.fullName}</p>
        <p><strong>ایمیل:</strong> {customer.email}</p>
        <p><strong>شماره تماس:</strong> {customer.phone}</p>
        <p><strong>آدرس:</strong> {customer.address}</p>
        </div>
       
  
        <h3 className="text-lg font-semibold pt-4">سفارشات:</h3>
        {orders.map((item, i) => (
          <div key={i} className="border p-3 rounded-md bg-gray-100 mb-2">
            <p><strong>نام غذا:</strong> {item.foodName}</p>
            <p><strong>تعداد:</strong> {item.quantity}</p>
            {item.notes && <p><strong>توضیحات:</strong> {item.notes}</p>}
          </div>
        ))}
  
        <button onClick={onReset} className="btn-primary w-full mt-4">سفارش جدید</button>
      </div>
    );
  }
  
  export default Invoice;
  