import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Modal } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons'
import { globalStyles } from './styles/global'
import FlatButton from './shared/button'
import {Formik} from 'formik'
import * as yup from 'yup'
import TrackingInfo from './shared/trackingInfo'

const trackingSchema = yup.object({
  trackingNumber: yup
    .string()
    .required()
    .min(10)
})

export default function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const [trackingNumber, setTracking] = useState('')



  return (
    <View style={globalStyles.container}>
      {/* button to enter tracking info */}
      <Feather 
        name="package"
        size={84}
        onPress={() => setModalOpen(true)}
        style={styles.icon}
      />
      {/*  modal for tracking entry */}
      <Modal visible={modalOpen}>
        <AntDesign
          name="closecircle"
          size={76}
          onPress={() => setModalOpen(false)}
          style={styles.icon}
        />
        <Formik
          initialValues={{
            trackingNumber: '',
          }}     
          validationSchema={trackingSchema}
          onSubmit={(values, actions) => {
            setTracking(values.trackingNumber)
            actions.resetForm()
            setModalOpen(false)
          }}     
        >
          {(props) => (
            <View>
              <TextInput
                required
                style={globalStyles.input}
                placeHolder="Tracking Number"
                value={props.values.trackingNumber}
                onChangeText={props.handleChange('trackingNumber')}
                onBlur={props.handleBlur('trackingNumber')}
              />
              <Text style={globalStyles.errorText}>{props.touched.trackingNumber && props.errors.trackingNumber}</Text>
              <FlatButton text='submit' onPress={props.handleSubmit}/>
            </View>
          )}
        </Formik>
      </Modal>
      {/* display tracking info */}
      { trackingNumber ? 
        <TrackingInfo trackingNumber={trackingNumber}></TrackingInfo>
        : 
        <Text style={globalStyles.titleText}>No Tracking # has been selected, press the icon above to enter a tracking number</Text>
      }
    </View>
  );
}


const styles = StyleSheet.create({
  icon: {
    padding: 10,
    marginTop: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignSelf: "center",
    justifyContent: 'center'
  },

})