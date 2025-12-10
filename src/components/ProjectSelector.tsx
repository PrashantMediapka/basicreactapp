import React, { Suspense, useEffect, useState }  from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ProjectReporter from './ProjectReporter';
import ReactMarkdown from 'react-markdown';
import '../App.css';  

export interface HeaderProps {
    username: string;
 }

 export interface ProjectReporterProps {
    projectKeyId: string;
 }

export interface ProjectsInfo {
    personalAccessToken: string;
    projectName: string;
    projectDisplayName: string;
    projectBoardType: string;
    projectKeyId: string;
 }


const ProjectSelector : React.FC = () => {
      const [projectsInfo, setProjectsInfo] = React.useState<ProjectsInfo[] | null>(null);
      const [projectKeyId, setProjectsKeyId] = React.useState<string>('');


    const status = useSelector((state:any) => state.homeSlice.status);
     console.log("User from Redux in Home:", status);

     const getProjectsData = async () => {
        
        try {
        const response : any = await axios.get<any>(`https://localhost:61003/api/Agent/GetAzOpenAIAzureBoardProjects`);   
        const projectdata : ProjectsInfo[] = response.data;
        setProjectsInfo(projectdata);            
        console.log("Projects  fetched:",projectdata); 
        }
        catch (error) {
            console.error("Error fetching data:", error);
        }   
        finally {
            console.log("Data fetch attempt completed.");
        }   
    };

    // Shared event handler
    const handleProjectChange = (value : any) => {
       
        setProjectsKeyId(value);
       
        console.log("Selected Project Key:", value);
    };

  const [projectsMessage, setprojectsMessage] = React.useState<string>('');

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

// useEffect(() => {

// getProjectsReportData();

// },[projectKeyId]);

useEffect(() => {
    getProjectsData();
},[]);

const sendReport = () => {        
        try {  
            const url = `http://localhost:7039/api/run-report/${projectKeyId}`;
          console.log("sending.."+ url);
        const response : any = axios.get<any>(url);   
        console.log(response.data);
      console.log("Sent:",response.data); 

        }
        catch (error) {
            console.error("Error fetching data:", error);
        }   
        finally {
            console.log("Data fetch attempt completed.");
        }   
    };

     return(
        <div className="container"> 
          <div style={{ display: 'flex', alignItems: 'top   ', gap: '10px' }}>
            <div>
            <h4>Projects:</h4>          
            <select value={projectKeyId}
             onChange={(e) => handleProjectChange(e.target.value)}
            >
                <option value="">-- select project --</option>
                {projectsInfo && projectsInfo.map((project, index) => (
                    <option key={index} value={project.projectKeyId}>
                        {project.projectDisplayName}
                    </option>
                ))}
            </select>            
            <button onClick={getProjectsReportData} disabled={!projectKeyId || projectKeyId.trim() === ""} >Generate Report</button>
            </div>             
           <div>            
            <Suspense fallback="Generating Report. Please wait..!" >
            <h2>{projectsInfo?.find(p => p.projectKeyId === projectKeyId)?.projectDisplayName || "<no name>"}</h2>
             <div><input type='button' disabled={!projectsMessage || projectsMessage.trim() === ""} style={{padding:'10px'}} onClick={sendReport} value="Send Report" />
             </div>
             <ReactMarkdown children={projectsMessage} /> 
             </Suspense>      
        </div>
        </div>
          {/* <div>
           <ProjectReporter props={projectKeyId} />                      
        </div> */}
      
        </div>
    );
};

export default ProjectSelector;