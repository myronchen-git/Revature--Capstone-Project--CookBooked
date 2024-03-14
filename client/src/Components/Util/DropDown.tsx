import React from 'react'
import "./DropDown.css"

function DropDown(props: any) {
  return (
    <>
        <div className="dropdown-center">
            <button className="btn btn-danger dropdown-toggle p-md-3 p-sm-1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {props.selectedItem}
            </button>
            <ul className="dropdown-menu">
                {
                  props.categories.map((category: string, idx: string) => {
                    return (
                      <>
                        <div className='dropdown-hover'><li><a key={idx} className="dropdown-item p-3 cursor-pointer d-flex justify-content-center" onClick={() => props.selectItemHandler(category)}>{category}</a></li></div>
                      </>
                    )
                  })
                }
            </ul>
        </div>
    </>
  )
}

export default React.memo(DropDown);