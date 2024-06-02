import React, { useState } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label
    } from "reactstrap";

const CustomModal = (props) => {
    const [activeItem,setActiveItem]=useState(props.activeItem)

    const handleChange=e=>{
        let {name,value}=e.target
        if (e.target.type==="checkbox") {
            value=e.target.checked
        }
        const activeIte={...activeItem,[name]:value}
        setActiveItem(activeIte)

    }
    const {toggle,onSave}=props
  return (
    <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> Task Item </ModalHeader>
        <ModalBody>
        <Form>
        <FormGroup>
            <Label for="title">Title</Label>
            <Input
                type="text"
                name="title"
                value={activeItem.title}
                onChange={handleChange}
                placeholder="Enter Task Title"
            />
            </FormGroup>
            <FormGroup>
			<Label for="description">Description</Label>
			<Input
				type="text"
				name="description"
				value={activeItem.description}
				onChange={handleChange}
				placeholder="Enter Task Description"
			/>
			</FormGroup>
            <FormGroup check>
			<Label for="completed">
				<Input
				type="checkbox"
				name="completed"
				checked={activeItem.completed}
				onChange={handleChange}
				/>
				Completed
			</Label>
			</FormGroup>
        </Form>
        </ModalBody>
        <ModalFooter>
		<Button color="success" onClick={() => onSave(activeItem)}>
			Save
		</Button>
		</ModalFooter>
    </Modal>
  )
}

export default CustomModal
