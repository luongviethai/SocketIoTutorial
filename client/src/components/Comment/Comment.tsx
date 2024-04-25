import { useState } from "react";
import { toast } from 'react-toastify';

function Comment(props) {
  const { note, status } = props;
  const [show, setShow] = useState(false);
  const [value, setValue] = useState('')  

  const handleClick = () => {
    if(status === 'mouse') {
        console.log('zo day')
        setShow(!show);
        // toast("Wow so easy!");
    }
  }

  const handleChangeValue = (e) => {
    setValue(e.target.value)
  }

  const handleKeyDown = (e) => {
    if(e.key ==='Enter') {
        console.log('so day')
    }
  }

  return (
    <div
      style={{
        width: "30px",
        height: "30px",
        position: "absolute",
        top: note.x,
        left: note.y,
      }}
      onClick={handleClick}

    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          border: "1px solid black",
          borderRadius: "50%",
        }}

      >
        {show &&
        <div
          style={{
            position: "absolute",
            height: "100px",
            border: "1p solid black",
            top: "30px",
          }}
        >
          <input value={value} onChange={handleChangeValue} onKeyDown={handleKeyDown } />
        </div>
}
      </div>
    </div>
  );
}

export default Comment;
