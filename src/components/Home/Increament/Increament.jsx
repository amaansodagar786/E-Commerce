import CountUp from 'react-countup'
import './Increament.scss'
import { AiOutlineFundProjectionScreen } from 'react-icons/ai'
import { FaUserGraduate, FaHandshake} from "react-icons/fa";
import { MdPersonPinCircle } from 'react-icons/md'
import { blue } from '@mui/material/colors';

const Increament = () => {

    
    return (
        <div className='increment'>

            <div className='main-in'>
                <FaUserGraduate size={45}  className='icon'/>
                <div className='counting'>
                    <CountUp
                        start={0}
                        end={600}
                        duration={2.75}
                        separator=" "
                        decimals={0}
                        decimal=","
                        suffix='+'

                    />
                    <h2>Student Internship </h2>
                </div>
            </div>

            <div className='main-in'>
                <MdPersonPinCircle size={45}   className='icon'/>
                <div className='counting'>
                    <CountUp
                        start={0}
                        end={300}
                        duration={2.75}
                        separator=" "
                        decimals={0}
                        decimal=","
                        suffix='+'


                    />
                    <h2>Placement Given</h2>
                </div>
            </div>

            <div className='main-in'>
                <FaHandshake size={45}  style={{color: blue}} className='icon'/>
                <div className='counting'>
                    <CountUp
                        start={0}
                        end={100}
                        suffix='+'
                        duration={2.75}
                        separator=" "
                        decimals={0}
                        decimal=","


                    />
                    <h2>Companies Tieup</h2>
                </div>
            </div>

            <div className='main-in'>
                <AiOutlineFundProjectionScreen size={45}   className='icon'/>
                <div className='counting' style={{borderRight: "none"}}>
                    <CountUp
                        start={0}
                        end={60}
                        duration={2.75}
                        separator=" "
                        decimals={0}
                        decimal=","
                        suffix='+'


                    />

                    <h2>projects Completed</h2>
                </div>
            </div>


        </div>
    )
}

export default Increament