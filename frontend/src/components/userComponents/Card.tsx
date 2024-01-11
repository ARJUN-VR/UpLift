

export const Card = () => {
  return (
<div className="max-w-sm rounded overflow-hidden shadow-xl bg-white h-[438px] mt-8">
  <img className="w-full" src="https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/41jeiOH5VPL.jpg" alt="Sunset in the mountains"/>
  <div className="px-6 py-4">
    <h4>category</h4>
    <div className="font-bold text-xl mb-2" >campaign name</div>
    <p className="text-gray-700 text-base overflow-hidden whitespace-nowrap overflow-ellipsis">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
    </p>
  </div>
  <div className="px-6 pt-4 pb-2 flex justify-between">
    <h3>0.0 raised</h3>
    <h3>23 days left</h3>
  </div>
  <div className="px-6 pt-4 pb-2">
  <p>by:-user</p>

  </div>
</div>

  )
}
