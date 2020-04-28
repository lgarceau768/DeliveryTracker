import { Button, View, Text } from 'react-native'
import React, { useState } from 'react'
import { AppLoading, apisAreAvailable } from 'expo'
import { env } from '../env'

var tracker = require('delivery-tracker')
const getTrackingInfo = (trackingNumber, setDone) => {
   
   var courier = tracker.courier(tracker.COURIER.FEDEX.CODE)
    console.log('started trac')
   courier.tracker({trackingNumber}, function(err, result) {
       if(err){
           console.log(error, err)
       } else {
           console.log(result)
       }
   })
    
}

export default function TrackingInfo({ trackingNumber}) {
    const [requestComplete, setRequestComplete] = useState(false)
    const [trackingInfo, setTrackingInfo] = useState({})
    const setDone = (response) => {
        setRequestComplete(true)
        console.log(response)
        setTrackingInfo(response)
    }
    getTrackingInfo(trackingNumber, setDone)
    return(
        <Text>Tracking</Text>
    )
        
    // if(requestComplete){
    //     return(
    //         <Text>Request Complete</Text>
    //     )
    // } else {
    //     return(
    //         <AppLoading
    //             startAsync={() => getTrackingInfo(trackingNumber, setDone)}
    //             onFinish={() => console.log('finished')}
    //         />
    //     )
    // }
    

}