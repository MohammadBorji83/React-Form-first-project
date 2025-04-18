import { useState } from "react";
import TicketForm from "./TicketForm";
import TicketSummary from "./icketSummary";

function Ticket(){
    const [orderData, setOrderData] = useState(null);

const handleTicketSubmit = (data) => {
  setOrderData(data);
};

const resetForm = () => {
  setOrderData(null);
};
return(
    <div>
        <h1 className="text-center text-4xl mb-11" >سیستم خرید بلیط</h1>
        {!orderData?(
            <TicketForm onSubmitTicket={handleTicketSubmit}/>
        ) :(
            <TicketSummary data={orderData} onRest={resetForm}/>
        )}
    </div>
)

}
export default Ticket;