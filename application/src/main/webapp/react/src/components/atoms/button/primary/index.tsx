import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage} from "../../../../store/login/types/action.function.types";
import {IStore} from "../../../../store/login/types/store.interface.types";

const PrimaryButton = (props: any) => {

    const dispatch = useDispatch();
    const value: number = useSelector((state: IStore) => state.value);

    return (
      <div>
          <p> Value From Redux Store: {value}</p>
          <button onClick={() => {
              dispatch(
                  sendMessage(55)
              )
          }}/>
      </div>
    );
};

export default PrimaryButton;