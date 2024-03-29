
import { CreatorLiveComponent } from '../../components/creatorComponents/CreatorLiveComponent'
import { useLocation } from 'react-router-dom'
import { LiveStreamComponent } from '../../components/userComponents/LiveStreamComponent'

export const LiveStreampage = () => {
  const url = useLocation()
  return (
    <div>
      {
        url.pathname === '/liveHost'&&(
          <CreatorLiveComponent/>
        )

      }
      {
        url.pathname === '/live' &&(
          <LiveStreamComponent/>
        )
      }
    </div>
  )
}
