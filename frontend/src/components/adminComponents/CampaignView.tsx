import React from 'react'
import { useParams } from 'react-router-dom'

export const CampaignView = () => {

    const {id} = useParams()

  return (
    <div>
   <h1>this is campaign view</h1>
    </div>
  )
}
