import React, {useState} from 'react';    
    
    const [req,setReq] = useState({
        studentname: '',
        course: '',
        registrationdate: '',
        period: '',
        id: -1,
        creadAt: new Date().toISOString(),

});