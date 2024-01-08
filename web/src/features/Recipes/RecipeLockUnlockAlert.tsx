import { RefObject } from 'react';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
} from '@chakra-ui/react'

interface Props{
    isPrivate: boolean;
    isOpen: boolean;
    onClose: () => void;
    cancelRef: RefObject<HTMLButtonElement>;
    onToggle: () => void;
}

const RecipeLockUnlockAlert = ({isPrivate, isOpen, onClose, cancelRef, onToggle}: Props) => {
    return(
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        {isPrivate ? "Unlock Recipe" : "Lock Recipe"}
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        {isPrivate ?
                            "Do you want to share your recipe?" :
                            "Do you want to lock your recipe?"
                        }
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button colorScheme="orange" variant="outline" ref={cancelRef} onClick={onClose}>
                            No
                        </Button>
                        <Button colorScheme="orange" onClick={onToggle} ml={3}>
                            Yes
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}

export default RecipeLockUnlockAlert;