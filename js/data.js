// https://www.wsfscheduleapp.com/data/GetCamerasJson.php

var cameras = {
    "1": {
        "Anacortes::Terminal": "https://images.wsdot.wa.gov/wsf/anacortes/terminal/anaterm.jpg",
        "Anacortes::Holding": "https://images.wsdot.wa.gov/wsf/anacortes/holding/anahold.jpg",
        "Anacortes::Road": "https://images.wsdot.wa.gov/wsf/anacortes/road/anaroad.jpg"
    },
    "3": {
        "Bainbridge::Holding": "https://images.wsdot.wa.gov/wsf/Bainbridge//Bainbridge.jpg",
        "Bainbridge Island::Seattle": "https://206.63.218.8/axis-cgi/jpg/image.cgi"
    },
    "4": {
        "Bremerton::Holding": "https://images.wsdot.wa.gov/wsf/bremerton/holding/holding.jpg"
    },
    "5": {
        "Clinton::Terminal": "https://images.wsdot.wa.gov/wsf/clinton/terminal/clinton.jpg",
        "Clinton::Dock": "https://www.whidbeytel.com/sites/all/themes/wtel/cam/dock-boothdock.jpg",
        "Clinton::Uphill": "https://www.whidbeytel.com/sites/all/themes/wtel/cam/uphill-boothhill.jpg",
        "Clinton::E SR 525": "https://www.whidbeytel.com/sites/all/themes/wtel/cam/east-clinteast.jpg",
        "Clinton::W SR 525": "https://www.whidbeytel.com/sites/all/themes/wtel/cam/west-clintwest.jpg"
    },
    "7": null,
    "8": {
        "Edmonds::W Dayton St": "https://images.wsdot.wa.gov/wsf/edmonds/104dayton.jpg",
        "Edmonds::VMS Sign": "https://images.wsdot.wa.gov/wsf/edmonds/104vms_wts.jpg",
        "Edmonds::Holding": "https://images.wsdot.wa.gov/wsf/edmonds/holding.jpg",
        "Edmonds::Vessel": "https://images.wsdot.wa.gov/wsf/edmonds/vessel.jpg",
        "Edmonds::Underpass": "https://images.wsdot.wa.gov/wsf/edmonds/104underpass.jpg",
        "Edmonds::Pine": "https://images.wsdot.wa.gov/wsf/edmonds/104pine.jpg"
    },
    "9": {
        "Fauntleroy::Holding": "https://images.wsdot.wa.gov/wsf/fauntleroy/terminal/fauntleroy.jpg",
        "Fauntleroy::Way North": "https://images.wsdot.wa.gov/wsf/fauntleroy/terminal/fauntterminal.jpg",
        "Fauntleroy::Trenton North": "https://images.wsdot.wa.gov/wsf/fauntleroy/terminal/faunttrenton.jpg",
        "Fauntleroy::Lincoln Park North": "https://images.wsdot.wa.gov/wsf/fauntleroy/terminal/fauntlincoln.jpg?1483217261869",
        "Fauntleroy:Cloverdale": "https://www.seattle.gov/trafficcams/images/Fauntleroy_Cloverdale.jpg"
    },
    "10": {
        "Friday Harbor::Terminal": "https://www.islandcam.com/camimages/ffcam.jpg"
    },
    "11": {
        "Coupeville::Terminal": "https://images.wsdot.wa.gov/wsf/Keystone/Street/keyStreet.jpg",
        "Coupeville::Street": "https://images.wsdot.wa.gov/wsf/Keystone/terminal/keyterm.jpg"
    },
    "12": {
        "Kingston::Terminal": "https://images.wsdot.wa.gov/wsf/kingston/terminal/kingston.jpg",
        "Kingston::Ferry Sign East": "https://images.wsdot.wa.gov/wsf/kingston/fse/fse.jpg",
        "Kingston::Ferry Sign West": "https://images.wsdot.wa.gov/wsf/kingston/fsw/fsw.jpg",
        "Kingston::Barber": "https://images.wsdot.wa.gov/wsf/kingston/barber/barber.jpg"
    },
    "13": null,
    "14": {
        "Mukilteo::N525@76th": "https://images.wsdot.wa.gov/wsf/Mukilteo/N_525at76th/N_525at76th_wts.jpg",
        "Mukilteo::S525@76th": "https://images.wsdot.wa.gov/wsf/Mukilteo/S_525at76th/S_525at76th_wts.jpg",
        "Mukilteo::525@CloverLn": "https://images.wsdot.wa.gov/wsf/Mukilteo/525atCloverLn/525atCloverLn_wts.jpg",
        "Mukilteo::SouthHolding": "https://images.wsdot.wa.gov/wsf/Mukilteo/Terminal/mukterm.jpg",
        "Mukilteo::NorthHolding": "https://images.wsdot.wa.gov/wsf/Mukilteo/North/North.jpg"
    },
    "15": {
        "Orcas::Terminal": "https://www.islandcam.com/camimages/ofcam.jpg"
    },
    "16": {
        "Point Defiance::Holding": "https://images.wsdot.wa.gov/wsf/PointDefiance/PtDefHolding.jpg",
        "Point Defianc::Booth": "https://images.wsdot.wa.gov/wsf/PointDefiance/PtDefBooth.jpg"
    },
    "17": {
        "Port Townsend::Terminal": "https://images.wsdot.wa.gov/wsf/PortTownsend/terminal/ptterm.jpg",
        "Port Townsend::Street": "https://images.wsdot.wa.gov/wsf/PortTownsend/Street/ptStreet.jpg"
    },
    "18": null,
    "19": null,
    "20": {
        "Southworth::Holding": "https://images.wsdot.wa.gov/wsf/southworth/terminal/southworth.jpg"
    },
    "21": {
        "Tahlequah::Holding": "https://images.wsdot.wa.gov/wsf/Tahlequah/holding/holding.jpg",
        "Tahlequah::Sign": "https://images.wsdot.wa.gov/wsf/Tahlequah/VMSSign/VMSSign.jpg"
    },
    "22": {
        "Vashon::Holding South": "https://images.wsdot.wa.gov/wsf/vashon/HoldingSouth.jpg",
        "Vashon::Bunker North": "https://images.wsdot.wa.gov/wsf/vashon/VSHvc00001.jpg",
        "Vashon::Bunker South": "https://images.wsdot.wa.gov/wsf/vashon/VSHvc00002.jpg",
        "Vashon::112th North": "https://images.wsdot.wa.gov/wsf/vashon/VSHvc00004.jpg",
        "Vashon::112th South": "https://images.wsdot.wa.gov/wsf/vashon/VSHvc00003.jpg"
    }
}
