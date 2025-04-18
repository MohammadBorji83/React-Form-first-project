import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
    customer: yup.object().shape({
    fullName:yup.string().required("پر کردن این فیلد الزامی است").matches(/[A-Z,a-z,آ-ی]/),
    email:yup.string().required().email(),
    phone: yup.string().matches(/[0-9]/).min(11,"شماره را صحیح وارد کنید").max(11,"شماره را صحیح وارد کنید").required("پر کردن این فیلد الزامی است"),
    address:yup.string().required("پر کردن این فیلد الزامی است").max(200),}),
  

    orders: yup.array().of(
    yup.object().shape({
      foodName: yup.string().required("نام غذا الزامیس"),
      quantity: yup.number().required("تعداد را وارد کنید").min(1," حداقل ۱ غذا باید وارد بشه").typeError("عدد را وارد کنید"),
      notes: yup.string(),
    })
    
  )
  .min(1, "حداقل یک آیتم سفارش باید اضافه شود"),

  acceptTerms: yup.boolean().oneOf([true], "باید قوانین را بپذیرید"),
});


function FoodOrderForm({ onSubmitOrder}){
    const {
        register,control,handleSubmit,formState: { errors },} = useForm({
        defaultValues: {
          customer: {
            fullName: "",
            email: "",
            phone: "",
            address: "",
          },
          orders: [{ foodName: "", quantity: "", notes: "" }],
        },
        resolver: yupResolver(schema),
      });
    
      const { fields, append, remove } = useFieldArray({
        control,
        name: "orders", 
      });
      const onSubmit = (data) => {
        onSubmitOrder(data);
      
      };

      return(
        <form onSubmit={handleSubmit(onSubmit)}
        className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-6">
        <h2 className="text-xl font-bold border-b pb-2">مشخصات مشتری</h2>

<div className="space-y-2">
  <input {...register("customer.fullName")} placeholder="نام کامل"
    className="input" />
  <p className="text-red-500 text-sm">{errors?.customer?.fullName?.message}</p>

  <input {...register("customer.email")} placeholder="ایمیل"
    className="input" />
  <p className="text-red-500 text-sm">{errors?.customer?.email?.message}</p>

  <input {...register("customer.phone")} placeholder="شماره تماس"
    className="input" />
  <p className="text-red-500 text-sm">{errors?.customer?.phone?.message}</p>

  <textarea {...register("customer.address")} placeholder="آدرس"
    className="input min-h-[80px]" />
  <p className="text-red-500 text-sm">{errors?.customer?.address?.message}</p>
</div>

      <h2  className="text-xl font-bold border-b pt-4 pb-2">اطلاعات سفارش </h2>
      {fields.map((field, index) => (
        <div key={field.id} style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
          <input
          className="input"
            {...register(`orders.${index}.foodName`)}
            placeholder="نام غذا"
          />
          <p>{errors?.orders?.[index]?.foodName?.message}</p>

          <input
          className="input"
            type="number"
            {...register(`orders.${index}.quantity`)}
            placeholder="تعداد"
          />
          <p>{errors?.orders?.[index]?.quantity?.message}</p>

          <textarea
          className="input min-h-[60px]"
            {...register(`orders.${index}.notes`)}
            placeholder="توضیحات"
          />

          <button 
          className="text-red-600 hover:underline" type="button" onClick={() => remove(index)}>
            حذف سفارش
          </button>
        </div>
      ))}

      <button
      className="btn-primary"
        type="button"
        onClick={() => append({ foodName: "", quantity: "", notes: "" })}
      >
        افزودن سفارش
      </button>

      
      <div className="flex items-center gap-2 pt-4">
  <input type="checkbox" {...register("acceptTerms")} className="w-4 h-4" />
  <label>قوانین را می‌پذیرم</label>
   </div>
   <p className="text-red-500 text-sm">{errors?.acceptTerms?.message}</p>

<button type="submit" className="btn-primary w-full mt-4">ارسال سفارش</button>
        </form>
      )

}
export default FoodOrderForm;