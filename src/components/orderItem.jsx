
function OrderItem({ register, index, remove, errors }) {
    return (
      <div style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
        <input
          {...register(`orders.${index}.foodName`)}
          placeholder="نام غذا"
        />
        <p>{errors?.orders?.[index]?.foodName?.message}</p>
  
        <input
          type="number"
          {...register(`orders.${index}.quantity`)}
          placeholder="تعداد"
        />
        <p>{errors?.orders?.[index]?.quantity?.message}</p>
  
        <textarea
          {...register(`orders.${index}.notes`)}
          placeholder="توضیحات"
        />
  
        <button type="button" onClick={() => remove(index)}>
          حذف سفارش
        </button>
      </div>
    );
  }
  
  export default OrderItem;
  