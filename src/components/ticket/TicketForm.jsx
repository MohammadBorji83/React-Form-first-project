import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema=yup.object().shape({
    tickets:yup.array().of(
        yup.object().shape({
        teamName:yup.string().required("پرکردن این فیلد الزامیس").matches(/[A-Z,a-z,آ-ی]/),
        teadadTicket:yup.number().required().min(1,"حداقل باید یک بلیط بخرید"),
        seat:yup.string().required("انتخاب یکی از جایگاه ها الزامیس").oneOf(['A','B','C'],"جایگاه باید انتخاب شود"),
        phone:yup.string().required("پر کردن این فیلد الزامیس").matches(/[0-9]/,"شماره را صحیح وارد کنید").min(11,"شماره را صحیح وارد کنید").max(11,"شماره را صحیح وارد کنید"),
        })
    )
})

function TicketForm({onSubmitTicket}){
     const {
            register,control,handleSubmit,formState: { errors },} = useForm({
            defaultValues: {
             tickets: [{ teamName: "", teadadTicket: "", seat: "" ,phone:"" }],
            },
            resolver: yupResolver(schema),
          });

           const { fields, append, remove } = useFieldArray({
                  control,
                  name: "tickets", 
                });
                
                const onSubmit = (data) => {
                  onSubmitTicket(data);
                };

                return(
                  <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
                  <h2 className="text-2xl font-bold mb-6 text-center">فرم خرید بلیط فوتبال ⚽</h2>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
                    {fields.map((field, index) => (
                      <div key={field.id} className="p-4 border rounded-xl shadow-sm bg-gray-50 space-y-2">
                        
                        <input 
                          {...register(`tickets.${index}.teamName`)} 
                          placeholder="نام تیم" 
                          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <p className="text-red-500 text-sm">{errors?.tickets?.[index]?.teamName?.message}</p>
            
                        <input 
                          {...register(`tickets.${index}.teadadTicket`)} 
                          placeholder="تعداد بلیط" 
                          type="number"
                          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <p className="text-red-500 text-sm">{errors?.tickets?.[index]?.teadadTicket?.message}</p>
            
                        <div className="flex gap-4 items-center">
                          <label className="flex items-center gap-2">
                            <input type="radio" value="A" {...register(`tickets.${index}.seat`)} />
                            جایگاه A
                          </label>
                          <label className="flex items-center gap-2">
                            <input type="radio" value="B" {...register(`tickets.${index}.seat`)} />
                            جایگاه B
                          </label>
                          <label className="flex items-center gap-2">
                            <input type="radio" value="C" {...register(`tickets.${index}.seat`)} />
                            جایگاه C
                          </label>
                        </div>
                        <p className="text-red-500 text-sm">{errors?.tickets?.[index]?.seat?.message}</p>
            
                        <input 
                          {...register(`tickets.${index}.phone`)} 
                          placeholder="شماره تماس" 
                          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <p className="text-red-500 text-sm">{errors?.tickets?.[index]?.phone?.message}</p>
            
                        <button 
                          type="button" 
                          onClick={() => remove(index)}
                          className="text-white bg-red-500 px-4 py-1 rounded-full hover:bg-red-600"
                        >
                          حذف سفارش
                        </button>
                      </div>
                    ))}
            
                    <div className="flex justify-between">
                      <button 
                        type="button"
                        onClick={() => append({ teamName: "", teadadTicket: "", seat: "", phone: "" })}
                        className="text-white bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600"
                      >
                        افزودن سفارش جدید
                      </button>
            
                      <button 
                        type="submit"
                        className="text-white bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700"
                      >
                        ثبت سفارش
                      </button>
                    </div>
                  </form>
                </div>
                    
                )


}
export default TicketForm; 





