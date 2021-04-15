export default function Notification(props) {
return (
    <div className="alert alert-success alert-dismissible">
      {props.title} {props.message}
    </div>
  )
}