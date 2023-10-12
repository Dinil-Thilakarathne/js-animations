import Cursor from "../components/Cursor"
import { project1Image, project2Image, project3Image } from "../public"
import '../scss/style.scss'

const App = () => {

    const projectContents = [
        {
            projectName : 'project 1',
            projectTags : [
                'web design'
            ],
            projectRating : '08',
            projectColors : [
                '#1659EA', '#FE7D68', '#5FB983'
            ],
            projectTypography : 'DM Sans',
            projectTextWeights : [
                'Regular', 'Medium', 'Bold'
            ],
            projectImg : project1Image
        },
        {
            projectName : 'project 2',
            projectTags : [
                'web design', 'brand design'
            ],
            projectRating : '09',
            projectColors : [
                '#D46374', '#F1C072', '#EDE2DA'
            ],
            projectTypography : 'DM Sans',
            projectTextWeights : [
                'Regular', 'Medium', 'Bold'
            ],
            projectImg : project2Image
        },
        {
            projectName : 'project 3',
            projectTags : [
                'web design'
            ],
            projectRating : '08',
            projectColors : [
                '#ECEFF2', '#363851', '#2F2F2F'
            ],
            projectTypography : 'DM Sans',
            projectTextWeights : [
                'Regular', 'Medium', 'Bold'
            ],
            projectImg : project3Image
        }
    ]

    return (
        <div className="project-section">
            <Cursor/>
            {projectContents.map(project => {
                return (
                    <div className={`project ${project.projectName} grow`}>
                        <div className="project-top">
                            <div className="project-top__line"></div>
                            <div className="project-top__content">
                                <p className="project-name">
                                    {project.projectName}
                                </p>
                                <div className="project-tags">
                                    {project.projectTags.map(tag => {
                                        return (
                                            <div className="tag">
                                                {tag}
                                            </div>
                                        )
                                    })}
                                </div>
                                <p>
                                    {project.projectRating}/10
                                </p>
                            </div>
                        </div>
                        <div className="project-bottom">
                            <div className="project-bottom__content">
                                <div className="colors-section">
                                    <h3>Colors</h3>
                                    <div className="color-boxes">
                                        {project.projectColors.map(color => {
                                            return (
                                                <div className="color-box" style={{backgroundColor: `${color}`}}>
                                                    <span>
                                                        {color}
                                                    </span>
                                                </div>
                                            )
                                        })} 
                                    </div>
                                </div>
                                <div className="text-section">
                                    <div className="font-family">
                                        <h3>Typography</h3>
                                        {project.projectTypography}
                                    </div>
                                    <div className="font-weights">
                                        <h3>Weights</h3>
                                        {project.projectTextWeights.map((weight, index) => {
                                            return (
                                                <span>
                                                    {weight}
                                                </span>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="project-bottom__img">
                                <img src={project.projectImg} alt="" />
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default App