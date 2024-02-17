import React from 'react'

function EditItemForm({ editForm,setEditForm}) {
    if(!editForm)
    return null;
  return (
    <div className="fixed w-full inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center content-center">
      <div className="bg-white w-1/4 p-5 rounded-lg"></div>
    </div>
  )
}

export default EditItemForm