import React from "react";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import marker1 from "../../icons/hospitalpop.png"
import marker2 from "../../icons/health-centerpop.png"
import marker3 from "../../icons/tomy-pop.png"


export const PopUpInfo = ({ properties, onClose }) => {

    // Determine the correct icon based on properties.icon value
  const getMarkerIcon = () => {
    switch (properties.icon) {
      case "marker1":
        return marker1;
      case "marker2":
        return marker2;
      case "marker3":
        return marker3;
      default:
        return marker1; // Default icon in case of an unexpected value
    }
  };

  return (
    <Card
      sx={{
        width: 280,
        borderRadius: 3,
        // boxShadow: 3,
        padding: 2,
        position: "relative",
      }}
    >
      {/* Close Button */}
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          backgroundColor: "#F5F5F5",
          "&:hover": { backgroundColor: "#E0E0E0" },
        }}
      >
        <CloseIcon />
      </IconButton>

      <CardContent>
        {/* Name Section */}
        <div style={{display: "flex" ,alignItems: "center" ,width: "max-content",gap:"15px"}}>
            <img src={getMarkerIcon()} width={50} />
            <div >
                <Typography variant="caption" color="textSecondary" style={{    fontSize: '17px',
    fontFamily: 'Poppins',fontWeight: 500,lineHeight: 0,color: "#292d32ab"}}>
                Name
                </Typography>
                <Typography variant="h6" fontWeight="semi-bold" style={{    fontSize: '18px',
    fontFamily: 'Poppins',lineHeight: 1,color: "black"}}>
                {properties.name_en}
                </Typography>
            </div>
           
        </div>
        

        {/* Info Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 10 }}>
          {/* Type */}
          <div>
            <Typography variant="caption" color="textSecondary" style={{    fontSize: '13px',
    fontFamily: 'Poppins',lineHeight: 0,color: "#292d32ab"}}>
              Type
            </Typography>
            <Typography variant="body2" fontWeight="500" style={{    fontSize: '16px',
    fontFamily: 'Poppins',lineHeight: 1,color: "black"}}>
              {properties.Type_Of_hcp}
            </Typography>
          </div>

          {/* ID */}
          <div>
            <Typography variant="caption" color="textSecondary" style={{    fontSize: '13px',
    fontFamily: 'Poppins',lineHeight: 0,color: "#292d32ab"}}>
              Id
            </Typography>
            <Typography variant="body2" fontWeight="500" style={{    fontSize: '16px',
    fontFamily: 'Poppins',lineHeight: 1,color: "black"}}>
              {properties.id}
            </Typography>
          </div>

          {/* Address */}
          <div>
            <Typography variant="caption" color="textSecondary" style={{    fontSize: '13px',
    fontFamily: 'Poppins',lineHeight: 0,color: "#292d32ab"}}>
              Address
            </Typography>
            <Typography variant="body2" fontWeight="500" color="primary" style={{    fontSize: '16px',
    fontFamily: 'Poppins',lineHeight: 1}}>
              <a
                href={`https://maps.google.com/?q=${properties.address}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {properties.address}
              </a>
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PopUpInfo;
