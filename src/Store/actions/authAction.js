import actionTypes from '../Constant/Constant'
import firebase from '../../config/Firebase'
import { StackActions, NavigationActions } from 'react-navigation';


// Fb LogIn
export function fb_Action(type, token) {
    return dispatch => {
        if (type === 'success') {
            const credential = firebase.auth.FacebookAuthProvider.credential(token)

            firebase.auth().signInAndRetrieveDataWithCredential(credential).then((success) => {
                console.log(success.additionalUserInfo.profile.name, 'success******');
                var currentUID = success.user.uid
                var obj = {
                    Name: success.additionalUserInfo.profile.name,
                    UID: success.user.uid,
                    Photo: success.user.photoURL,
                    Token: token
                }
                firebase.database().ref('/UserData/' + currentUID).update(obj);

            })
                .catch((error) => {
                    console.log(error, '********');
                    alert(error)
                })
            console.log("fb login");

        } else {
            type === 'cancel'
        }

    }
}

// Google LogIn

export function Google_Action(currentUID, obj) {
    return dispatch => {
        dispatch(
            { type: actionTypes.UID, payload: currentUID }
        )
        dispatch(
            { type: actionTypes.USER, payload: obj }
        )
    }
}


// current User
export function current_User(currentUser) {
    return dispatch => {
        const UID = currentUser.uid
        var arr = [];
        dispatch(
            { type: actionTypes.UID, payload: UID }
        )
        firebase.database().ref('/UserData/').on('child_added', snapShot => {
            const UserData = snapShot.val();
            if (snapShot.key === currentUser.uid) {
                // console.log("user", snapShot.val())

                dispatch(
                    { type: actionTypes.USER, payload: snapShot.val() }
                )
            }
            else {
                arr.push(snapShot.val())
                // console.log("alluser", arr)
                dispatch(
                    { type: actionTypes.ALLUSER, payload: arr }
                )
            }
        })
       


        // Request
        var SendRequest = [];
        var ReceiveRequest = [];
        firebase.database().ref('/Request/').on('child_added', snapshot => {
            for (var key in snapshot.val()) {
                var value = snapshot.val()[key];

                if (value.data.UID === UID) {
                    // console.log(snapshot.val(), '---==>>');
                    SendRequest.push(value)
                }
                if (snapshot.key === UID) {
                    ReceiveRequest.push(value)
                }
            }
        })

        // SEND REQUEST
        dispatch(
            { type: actionTypes.SENDREQUEST, payload: SendRequest }
        )

        // RECEIVE REQUEST
        dispatch(
            { type: actionTypes.RECEIVEREQUEST, payload: ReceiveRequest }
        )

    }
}

//messages

// current User
export function User_Messages(userCurrent) {
    return dispatch => {
        // console.log(userCurrent,'dedux')
       
        var arr = [];
        var flag
        var chatMessages = []
        firebase.database().ref('/Messages/').on('child_added', snapShot => {
            const Messages = snapShot.val();

            // console.log('ye check karo ',Messages)
            flag = !flag
            if (Messages.senderUid === userCurrent.uid || Messages.reciverUid === userCurrent.uid) {
                // console.log("user", snapShot.val())
                chatMessages.push(Messages)

                dispatch(
                    { type: actionTypes.CHAT, payload: chatMessages }
                )
            }
            dispatch(
                { type: actionTypes.FLAG, payload: flag }
                )
                
                
            })
            console.log(chatMessages,'dheklo')
      
    }}

// export function User_New_Messages(data) {
//     return dispatch => {
        
//             dispatch(
//                 { type: actionTypes.NEWCHAT, payload: data }
//             )


// }}
// export function Delet_Messages() {
//     return dispatch => {
        
//             dispatch(
//                 { type: actionTypes.DeletChat, payload: null }
//             )


// }}

