import React, { memo, useEffect, useState }  from 'react';
import axios from 'axios';


const ProjectReporter : React.FC<any> = ({props}) => {
      const [projectsMessage, setprojectsMessage] = React.useState<string>('');
        const [projectKeyId, setProjectsKeyId] = React.useState<string>();

    console.log(props.projectKeyId);
    setProjectsKeyId(props.projectKeyId);

     const getProjectsReportData = async () => {
        
        try {
        const response : any = await axios.get<any>(`https://localhost:61003/api/Agent/GetAzOpenAIAzureBoardResponse?projectKeyId=`+ {projectKeyId});   
      //  console.log(response.data);
      console.log("Projects Message  fetched:",response.data); 
        setprojectsMessage(response.data);            
        
        }
        catch (error) {
            console.error("Error fetching data:", error);
        }   
        finally {
            console.log("Data fetch attempt completed.");
        }   
    };

useEffect(() => {

getProjectsReportData();

},[]);

     return(
        <div className="container"> 
        <div>
            <h4>Projects Report Summary:</h4>
           <section>
             {projectsMessage}
           </section>
        </div>
        </div>
    );

};

export default memo(ProjectReporter);