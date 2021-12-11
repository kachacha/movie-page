// 配置主机地址和端口号（可以有多个，需要测试那个环境字节打开那个base即可）
let base = "http://10.110.147.194:8088"
//  let base = "http://34.231.59.44:37653"
//  let base = "http://34.231.59.45:37654"
//  let base = "http://34.231.59.46:37655"
//  let base = "http://34.231.59.47:37656"
// 在线api接口路径，需要和项目后台确认
let online_url = {
    overall: base + "/report/queryNewOverView",
    //service-volume-controller : Service Volume Controller
    totalVolume: base + "/report/visitVolume/totalVolume",
    channelCompare: base + "/report/visitVolume/channelCompare",
    //user-data-controller : User Data Controller
    repeatUser: base + "/report/users/repeatUser",
    userChannelCompare: base + "/report/users/userChannelCompare",
    userDistribution: base + "/report/users/userDistribution",
    userVolumeTrend: base + "/report/users/userVolumeTrend",
    //efficiency-controller : Efficiency Controller
    solvedRate: base + "/report/efficiency/solveRate",
    solvedQuestion: base + "/report/efficiency/solveQuestion",
    solveQuestionFloat: base + "/report/efficiency/solveQuestionFloat",
    transferredRate: base + "/report/efficiency/transferredRate",
    transferredRateF: base + "/report/efficiency/transferredRateF",
    transferredQuestion: base + "/report/efficiency/transferredQuestion",
    transferredQuestionF: base + "/report/efficiency/transferredQuestionF",
    //kg-performance-controller : Kg Performance Controller
    question: base + "/report/kgperformance/domain&question",
    questionF: base + "/report/kgperformance/questionF",
    //session-follow-controller : Session Follow Controller
    handTime: base + "/report/sessionfollow/handTime",
    handTurns: base + "/report/sessionfollow/handTurns",
    dialogueStage: base + "/report/sessionfollow/dialogueStage",
    customerjourney: base + "/report/sessionfollow/customerjourney",

    //select /report/queryCountryAndChannel
    domainIntent: base + "/report/auxiliary/domain_intent",
    queryCountryAndChannel: base + "/report/auxiliary/queryCountryAndChannel",
    partExport: base + "/report/partExport000"

}

//导出online_url对象
export default online_url