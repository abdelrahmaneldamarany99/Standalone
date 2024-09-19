import { Suspense, lazy } from "react";

const UpdateCustomer=lazy(()=>import("./UpdateCustomer.js"))

const SuspendedUpdateCustomer=()=>{

    return(
        <Suspense fallback={<p>Loading...</p>}>
            <UpdateCustomer/>
        </Suspense>
    )
}

export default SuspendedUpdateCustomer