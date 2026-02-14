import { useEmployeeData } from "@/hooks/useEmployeeData";
import Table from "@/components/Table/Table";
import { Box, Typography, Container } from "@mui/material";

function App() {
    useEmployeeData();

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
                Employee Data Table
            </Typography>
            <Box>
                <Table />
            </Box>
        </Container>
    );
}

export default App;
