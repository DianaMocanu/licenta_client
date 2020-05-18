import React from 'react';
import "../css/list.css"
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
class List extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            areChecked : {},
        }
    }

    // componentDidMount() {
    //     let newObj ={};
    //     this.props.results.forEach((row, index)=>{
    //         newObj[index]= false
    //     });
    //     this.setState({
    //         areChecked: {
    //             ...newObj,
    //         },
    //     })
    // }

    // componentDidUpdate(previousProps, previousState) {
    //     if (previousProps.results !== this.props.results) {
    //         let newObj ={};
    //         this.props.results.forEach((row, index)=>{
    //             newObj[index]= false
    //         });
    //         console.log(newObj)
    //         console.log(this.state.areChecked)
    //         this.setState({
    //             areChecked: {
    //                 ...newObj,
    //             },
    //         })
    //     }
    // }
    filterChecked = () =>{
        Object.filter = (obj, predicate) =>
            Object.keys(obj)
                .filter( key => predicate(obj[key]) )
                .reduce( (res, key) => (res[key] = obj[key], res), {} );
        let checkboxes = this.state.areChecked;
        const filtered = Object.filter(checkboxes, score => score === true);
        this.props.reconstructCondition(Object.keys(filtered))


    }

    checkCheckBox = (event, checked) =>{
        const id = event.target.id;
        this.setState({
            areChecked: {
                ...this.state.areChecked,
                [id]: checked
            },
        }
         ,   this.filterChecked,);

    }

    modifyChecked = (id, value)=>{
        this.setState({
            areChecked: {
                ...this.state.areChecked,
                [id]: value
            }
        });
    }

    getRowCondition = () =>{
      return this.props.results.map((row, index)=>{

              let checked = index === 0;
         return(
             <li className="conditionLiClass" key={index}>

                 <FormControlLabel control={<Checkbox id={index.toString()} onChange={this.checkCheckBox} value={row}/>} label={row.toString()}/>


             </li>
         );
      });
    };

    render() {
        return(
            <div className="listDiv">
                <ul id="ulResult">{
                    this.getRowCondition()}
                </ul>
            </div>
        );
    }


}

export default List
