import {v2 as cloudinary} from 'cloudinary';
import { configKeys } from '../../frameworks/database/mongoDb/config';

cloudinary.config({ 
    cloud_name: `${configKeys.CLOUD_NAME}`, 
    api_key: `${configKeys.API_KEY}`, 
    api_secret: `${configKeys.API_SECRET}`
  });


  export default cloudinary