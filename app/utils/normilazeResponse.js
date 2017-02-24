/**
 * Created by dionid on 24.02.17.
 */


export default function normalizeResponse(data){
    return (data.data || data).reduce((obj,card)=>{
        obj[card.id]=card;
        return obj;
    },{});
};