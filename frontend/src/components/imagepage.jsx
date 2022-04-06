import { useLocation } from "react-router";
import Image from "react-bootstrap/Image";
import {Container,Row,Col,Form,Button,InputGroup,FormControl} from "react-bootstrap"
import { saveAs } from 'file-saver'
import {HiDownload} from "react-icons/hi"

function ImagePage(props)
{
    const downloadImage = (imageURL,width=0,height=0) => {
        //call image dl

        if(width === 0 || height === 0)
        {
          saveAs(imageURL, 'image.jpg') // Put your image url here.
        }
        else
        {
            saveAs(imageURL+"&q="+width+"&w="+height)
        }
        
      }
  

    const location = useLocation();
    console.log(location.state);
    return(
        <div >

       <h1>IMAGE PAGE</h1>
       <Row className="justify-content-md-center">
       <Col lg="3" md="6" sm="6" xs="12" >
            <h2>Raw Image</h2>
            <Image className="Selected-img" src={location.state.link} thumbnail/>
            <Button onClick={()=>downloadImage(location.state.link,0,0)}><HiDownload/></Button>
       </Col>
       </Row>
       <Row>    
            <Col lg="3" md="6" sm="6" xs="12">
                <h2>24 x 24</h2>
                <Image className="p24by24" src={location.state.link} thumbnail/>
                <div>
                    <Button onClick={()=>downloadImage(location.state.link,24,24)}><HiDownload/></Button>
                </div>
            </Col>
            <Col lg="3" md="6" sm="6" xs="12">
                <h2>64 x 64</h2>
                
                <Image className="p64by64" src={location.state.link} thumbnail/>
                <div>
                <Button onClick={()=>downloadImage(location.state.link,64,64)}><HiDownload/></Button>
                </div>
            </Col>
            <Col lg="3" md="6" sm="6" xs="12">
                <h2>128 x 128</h2>
                <Image className="p128by128" src={location.state.link} thumbnail/>
                <div>
                <Button onClick={()=>downloadImage(location.state.link,128,128)}><HiDownload/></Button>
                </div>
            </Col>
            <Col lg="3" md="6" sm="6" xs="12">
                <h2>256 x 256</h2>
                <Image className="p256by256" src={location.state.link} thumbnail/>
                <div>
                <Button onClick={()=>downloadImage(location.state.link,256,256)}><HiDownload/></Button>
                </div>
            </Col>
        </Row>



    </div>
    )
}




export default ImagePage;