
import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '@/styles/colors';

export default function PasswordPromptModal({ visible, onCancel, onSubmit }: {
    visible: boolean;
    onCancel: () => void;
    onSubmit: (password: string) => void;
}) {
    const [password, setPassword] = useState('');

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Confirm Deletion</Text>
                    <Text style={styles.subtitle}>Enter your password to delete your account</Text>

                    <TextInput
                        secureTextEntry
                        placeholder="Password"
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                    />

                    <View style={styles.buttonRow}>
                        <TouchableOpacity onPress={() => {
                            setPassword('');
                            onCancel();
                        }}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            if (!password.trim()) {
                                alert("Please enter your password.");
                                return;
                            }
                            onSubmit(password);
                            setPassword('');
                        }}>
                            <Text style={styles.confirmText}>Delete</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '85%',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    cancelText: {
        color: '#888',
        fontSize: 16,
    },
    confirmText: {
        color: Colors.dustyPurple,
        fontWeight: '600',
        fontSize: 16,
    },
});
