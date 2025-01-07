import { ContextAPI } from '../ContextApi'

export const returnUnreadMessages = (messages) => {
  const {loggedUser} = ContextAPI()
    const channelMessages = messages?.filter(e => e.senderId !== loggedUser?._id)
    
    if(channelMessages){
        let unReadMessages = 0;
        for(let i=0; i<=channelMessages.length-1; i++){
            if(channelMessages[i].status === "sent" || channelMessages[i].status === "received"){
                unReadMessages += 1
            } else {
                unReadMessages
            }
        }

        return unReadMessages
    }
}